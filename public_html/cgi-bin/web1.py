#!/usr/bin/env python3

import os
from pathlib import Path
from urllib.parse import parse_qs

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
    
    # CTF ülesande põhimõte on see, et client saab serverile õelda vale hinna
    hind = int(params.get("hind", [1000])[0])

    print("Content-Type: text/plain; charset=utf-8")
    print()
    if hind <= 10:
        ANDMED = Path(__file__).resolve().parent.parent.parent / "andmed"
        vastus = (ANDMED / "vastused/web-exploitation-1.txt").read_text(encoding="utf-8")
        print(vastus)
    else:
        print("Pole piisavalt punkte!")
