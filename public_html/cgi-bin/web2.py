#!/usr/bin/env python3

import os
from pathlib import Path
from urllib.parse import parse_qs
import sqlite3
from http.cookies import SimpleCookie
import secrets
import json

method = os.environ.get("REQUEST_METHOD", "")

if method != "GET":
    print("Status: 405 Method Not Allowed")
    print("Allow: GET")
    print("Content-Type: text/html; charset=utf-8")
    print()
    print("<h1>405 Method Not Allowed</h1>")
else:
    ANDMED = Path(__file__).resolve().parent.parent.parent / "andmed"

    query_string = os.environ.get("QUERY_STRING", "")
    params = parse_qs(query_string)

    nimi = params.get("nimi", [""])[0]
    kogus = int(params.get("kogus", ["1"])[0])

    db = sqlite3.connect(ANDMED / "db" / "tulemused.sqlite3")
    db.execute("CREATE TABLE IF NOT EXISTS sessioonid (id TEXT PRIMARY KEY, punktid INTEGER NOT NULL)")

    kupsis = SimpleCookie(os.environ.get("HTTP_COOKIE", ""))
    sid = kupsis["web2-session"].value if "web2-session" in kupsis else ""
    rida = db.execute("SELECT punktid FROM sessioonid WHERE id = ?", (sid,)).fetchone()

    if rida:
        punktid = rida[0]
    else:
        sid = secrets.token_hex(16)
        punktid = 10
        db.execute("INSERT INTO sessioonid (id, punktid) VALUES (?, ?)", (sid, punktid))

    sonum = ""
    if nimi == "sokolaad":
        if  punktid >= 5 * kogus:
            punktid -= 5 * kogus  # Ülesande põhimõte on see, et saab anda negatiivse koguse et saada punkte juurde ja saada kätte lipp
            sonum = f"Ostsid {kogus} šokolaadi."
        else:
            sonum = "Pole piisavalt punkte."
    elif nimi == "lipp":
        if punktid >= 1000:
            punktid -= 1000
            sonum = (ANDMED / "vastused" / "web-exploitation-2.txt").read_text(encoding="utf-8").strip()
        else:
            sonum = "Pole piisavalt punkte."
     
    db.execute("UPDATE sessioonid SET punktid = ? WHERE id = ?", (punktid, sid))
    db.commit()
    db.close()

    print(f"Set-Cookie: web2-session={sid}; HttpOnly; SameSite=Strict")
    print("Content-Type: application/json; charset=utf-8")
    print()
    print(json.dumps({"punktid": punktid, "sonum": sonum}))
