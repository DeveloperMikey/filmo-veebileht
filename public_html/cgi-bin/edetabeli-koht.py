#!/usr/bin/env python3

import os
import json
from pathlib import Path
from urllib.parse import parse_qs
import sqlite3

method = os.environ.get("REQUEST_METHOD", "")

if method != "GET":
    print("Status: 405 Method Not Allowed")
    print("Allow: GET")
    print("Content-Type: text/html; charset=utf-8")
    print()
    print("<h1>405 Method Not Allowed</h1>")
else:
    query_string = os.environ.get("QUERY_STRING", "")
    params = parse_qs(query_string)
    
    id = int(params.get("id", [-1])[0])

    ANDMED = Path(__file__).resolve().parent.parent.parent / "andmed"
    
    print("Content-Type: application/json; charset=utf-8")
    print()

    db = sqlite3.connect(ANDMED / "db" / "tulemused.sqlite3")
    db.execute("""CREATE TABLE IF NOT EXISTS tulemused (
        id INTEGER PRIMARY KEY,
        ylesanne TEXT NOT NULL,
        aeg REAL NOT NULL
    )""")

    rida = db.execute("SELECT ylesanne, aeg FROM tulemused WHERE id = ?", (id,)).fetchone()

    if rida is None:
        print(json.dumps({"ok": False}))
    else:
        ylesanne, aeg = rida
        kiiremaid = db.execute(
            "SELECT COUNT(*) FROM tulemused WHERE ylesanne = ? AND aeg < ?",
            (ylesanne, aeg),
        ).fetchone()[0]
        print(json.dumps({"ok": True, "koht": kiiremaid + 1}))

    db.close()
