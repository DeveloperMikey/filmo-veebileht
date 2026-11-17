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
    
    ylesanne = params.get("ylesanne", ["web1"])[0]
    lipp = params.get("lipp", [""])[0]


    ANDMED = Path(__file__).resolve().parent.parent.parent / "andmed"

    print("Content-Type: application/json; charset=utf-8")
    print()

    vastus = (ANDMED / "vastused" / f"{ylesanne}.txt").read_text(encoding="utf-8").strip()
    if vastus == lipp:
        print("{\"ok\": true}")
    else:
        print("{\"ok\": false}")
