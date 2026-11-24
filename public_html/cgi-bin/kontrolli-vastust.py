#!/usr/bin/env python3

import os
import json
from pathlib import Path
from urllib.parse import parse_qs
import sqlite3

method = os.environ.get("REQUEST_METHOD", "")

ylesanded = ["cryptography-1", "cryptography-2", "web-exploitation-1", "web-exploitation-2", "steganography"]

if method != "GET":
    print("Status: 405 Method Not Allowed")
    print("Allow: GET")
    print("Content-Type: text/html; charset=utf-8")
    print()
    print("<h1>405 Method Not Allowed</h1>")
else:
    query_string = os.environ.get("QUERY_STRING", "")
    params = parse_qs(query_string)
    
    ylesanne = params.get("ylesanne", ["web1"])[0]
    lipp = params.get("lipp", [""])[0]
    aeg = int(params.get("aeg", [0])[0]) # kui kaua ylesanne võttis (ms)

    ANDMED = Path(__file__).resolve().parent.parent.parent / "andmed"
    
    print("Content-Type: application/json; charset=utf-8")
    print()

    if ylesanne not in ylesanded or aeg < 0:
        print("{\"ok\": false}")
    else:
        vastus = (ANDMED / "vastused" / f"{ylesanne}.txt").read_text(encoding="utf-8").strip()
        if vastus == lipp:
            db = sqlite3.connect(ANDMED / "db" / "tulemused.sqlite3")
            db.execute("""CREATE TABLE IF NOT EXISTS tulemused (
                id INTEGER PRIMARY KEY,
                ylesanne TEXT NOT NULL,
                aeg REAL NOT NULL
            )""")

            entry = db.execute("INSERT INTO tulemused (ylesanne, aeg) VALUES (?, ?)", (ylesanne, aeg))
            db.commit()
            id = entry.lastrowid
            print(json.dumps({
                "ok": True,
                "id": id
            }))
            db.close()
        else:
            print("{\"ok\": false}")
