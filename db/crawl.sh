#!/bin/bash

base_url="https://registrationssb.ucr.edu/StudentRegistrationSsb/ssb/searchResults/searchResults"
user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0"
accept="application/json, text/javascript, */*; q=0.01"
accept_language="en-US,en;q=0.5"
accept_encoding="gzip, deflate, br"
content_type="application/json"
x_requested_with="XMLHttpRequest"
dnt="1"
connection="keep-alive"
referer="https://registrationssb.ucr.edu/StudentRegistrationSsb/ssb/classSearch/classSearch"
# Session cookie here ... Add cookie before running
cookie=""
sec_fetch_dest="empty"
sec_fetch_mode="cors"
sec_fetch_site="same-origin"
sec_gpc="1"

page_offset=0
page_max_size=500
total_records=11000  # All class records listed

# No need to clear the file at the start

while [ $page_offset -lt $total_records ]; do
  filename="data_${page_offset}.jsonl"  # Unique filename for each iteration

  response=$(curl "$base_url?txt_term=202410&startDatepicker=&endDatepicker=&uniqueSessionId=9fsv21708118001908&pageOffset=$page_offset&pageMaxSize=$page_max_size&sortColumn=subjectDescription&sortDirection=asc" \
    -H "User-Agent: $user_agent" \
    -H "Accept: $accept" \
    -H "Accept-Language: $accept_language" \
    -H "Accept-Encoding: $accept_encoding" \
    -H "X-Requested-With: $x_requested_with" \
    -H "DNT: $dnt" \
    -H "Connection: $connection" \
    -H "Referer: $referer" \
    -H "Cookie: $cookie" \
    -H "Sec-Fetch-Dest: $sec_fetch_dest" \
    -H "Sec-Fetch-Mode: $sec_fetch_mode" \
    -H "Sec-Fetch-Site: $sec_fetch_site" \
    -H "Sec-GPC: $sec_gpc" \
    --compressed)

  echo "$response" > "$filename"  # Save to a new file for each response

  let page_offset+=page_max_size

  # Please don't DDOS the server
  sleep 5
done

echo "Data collection complete. Data saved to separate files."
