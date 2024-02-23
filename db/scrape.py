import mysql.connector 
import json
from datetime import datetime
import glob
# pip  intstall requests bs4 mysql.connector
import subprocess
script_path = './getdata.sh'
result = subprocess.run([script_path], stdout=subprocess.PIPE, text=True)



#send it to the my sql database 
db = mysql.connector.connect(
    host="localhost", #since we are not using a server as of now
    user="test",
    password="test",
    database="schedule"

)
file_pattern = 'data_*.json'
all_courses = []

for filename in glob.glob(file_pattern):
    with open(filename, 'r') as json_file:
        print(f"Loading file: {filename}")  # Print the name of the current file
        data = json.load(json_file)
        courses = data["data"]
        print(f"Number of courses in this file: {len(courses)}")  # Print the number of courses in the current file
        all_courses.extend(courses)  # Add the courses from this file to the list

print(f"Total number of courses loaded: {len(all_courses)}")  # Print the total number of courses loaded


# query struct
#     ->     id INTEGER AUTO_INCREMENT,
#     ->     courseName VARCHAR(50),
#     ->     term VARCHAR(30),
#     ->     CourseNum VARCHAR(15),
#     ->     Subject VARCHAR(100),
#     -> Lecture    LectureType VARCHAR(20),
#     ->     instructor VARCHAR(30),
#     ->     SeatCapacity INTEGER,
#     ->     Units INTEGER,
#     ->     startTime TIME, -- Assuming these represent times of the day
#     ->     endTime TIME,
#     ->     days SET('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'), -- Using SET for days
#     ->     building VARCHAR(50),
#     ->     room INTEGER,


cursor = db.cursor()
day_mapping = {
    'monday': 'Mon',
    'tuesday': 'Tue',
    'wednesday': 'Wed',
    'thursday': 'Thu',
    'friday': 'Fri',
    'saturday': 'Sat',
    'sunday': 'Sun'
}


# SQL command to insert data currently using dummy data
for entry in all_courses:
    # Extract relevant information
    courseId = entry["courseReferenceNumber"]
    courseName = entry["courseTitle"]
    term = entry["term"]
    CourseNum = entry["courseNumber"]
    Subject = entry["subject"]
    LectureType = entry["scheduleTypeDescription"]
    SeatCapacity = entry["enrollment"]
    Units = entry["creditHours"]
    instructor = None
    if entry.get("faculty") and isinstance(entry["faculty"], list) and entry["faculty"]:
        primary_faculty = [f for f in entry["faculty"] if f.get("primaryIndicator")]
        instructor = primary_faculty[0].get("displayName") if primary_faculty else entry["faculty"][0].get("displayName")
    # Initialize startTime and endTime
    startTime = None
    endTime = None

    if 'meetingsFaculty' in entry and entry['meetingsFaculty']:
        meeting_info = entry['meetingsFaculty'][0]['meetingTime']

        # Process startTime if it exists and is not None
        if meeting_info.get("beginTime"):
            startTime = datetime.strptime(meeting_info["beginTime"], '%H%M').strftime('%H:%M:%S')
        else:
            startTime = None

        # Process endTime if it exists and is not None
        if meeting_info.get("endTime"):
            endTime = datetime.strptime(meeting_info["endTime"], '%H%M').strftime('%H:%M:%S')
        else:
            endTime = None


        # Handle building and room
        building = meeting_info.get("building")
        room = meeting_info.get("room")
        meeting_time = entry["meetingsFaculty"][0]["meetingTime"]

        meeting_time = entry["meetingsFaculty"][0]["meetingTime"]

        # Filter and format the days where meetings occur
        meeting_days = [day_mapping[day] for day in day_mapping if meeting_time.get(day, False)]

        # Convert list of days to a string
        days = ','.join(meeting_days)  # Example result: 'Mon,Wed'



    building = meeting_info["building"]
    room = meeting_info["room"]

    insert_query = """
    INSERT INTO class (courseId, courseName, term, CourseNum, Subject, LectureType, instructor, SeatCapacity, Units, startTime, endTime, days, building, room)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """


    values = (courseId, courseName, term, CourseNum, Subject, LectureType, instructor, SeatCapacity, Units, startTime, endTime, days, building,room)

    try:
        cursor.execute(insert_query, values)
        db.commit()
        print(f"Inserted course: {courseId}")  

    except mysql.connector.Error as err:
        if err.errno == mysql.connector.errorcode.ER_DUP_ENTRY:
            continue
        else:
            print(f"Error inserting course {courseId}: {err}")

cursor.close()
db.close()
