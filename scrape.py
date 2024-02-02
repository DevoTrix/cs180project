import requests
from bs4 import BeautifulSoup
import mysql.connector 

# pip  intstall requests bs4 mysql.connector


# url="place link here"
# response = request.get(url)
# soup = BeautifulSoup(response.content, 'html.parser')

#get the data
# data = extract_data(soup)
#probably clean it up and break it into serctions or not sql might be able to do that.

#send it to the my sql database 
db = mysql.connector.connect(
    host="localhost", #since we are not using a server as of now
    user="test",
    password="",
    database="scraped"

)

cursor = db.cursor()

# SQL command to insert data currently using dummy data
insert_query = """
INSERT INTO books (title, author, publication_year) VALUES 
('To Kill a Mockingbird', 'Harper Lee', 1960),
('1984', 'George Orwell', 1949),
('The Great Gatsby', 'F. Scott Fitzgerald', 1925),
('Pride and Prejudice', 'Jane Austen', 1813),
('The Catcher in the Rye', 'J.D. Salinger', 1951),
('The Hobbit', 'J.R.R. Tolkien', 1937),
('The Diary of a Young Girl', 'Anne Frank', 1947),
('Moby-Dick', 'Herman Melville', 1851),
('War and Peace', 'Leo Tolstoy', 1869),
('The Adventures of Huckleberry Finn', 'Mark Twain', 1884);
"""

# Execute the command
cursor.execute(insert_query)
db.commit()

# Close the connection
cursor.close()
db.close()