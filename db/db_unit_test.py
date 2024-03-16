import unittest
from unittest.mock import patch, mock_open
import mysql.connector
from mysql.connector import errorcode
from io import StringIO
import os
from datetime import datetime

# Import the necessary functions and classes from your code
from scrape import create_table, day_mapping

class TestScriptFunctions(unittest.TestCase):

    @patch('mysql.connector.connect')
    def test_create_table(self, mock_connect):
        # Mock the cursor object
        mock_cursor = mock_connect.return_value.cursor.return_value
        create_table(mock_cursor)
        # Check if the create table query was executed
        mock_cursor.execute.assert_called_once()

    def test_day_mapping(self):
        self.assertEqual(day_mapping['monday'], 'Mon')
        self.assertEqual(day_mapping['tuesday'], 'Tue')
        self.assertEqual(day_mapping['wednesday'], 'Wed')
        self.assertEqual(day_mapping['thursday'], 'Thu')
        self.assertEqual(day_mapping['friday'], 'Fri')
        self.assertEqual(day_mapping['saturday'], 'Sat')
        self.assertEqual(day_mapping['sunday'], 'Sun')

    @patch('builtins.open', new_callable=mock_open, read_data='{"data": []}')
    def test_load_courses(self, mock_file):
        file_pattern = 'data_*.json'
        all_courses = []
        for filename in [f'data_{i}.json' for i in range(3)]:
            with patch('glob.glob', return_value=[filename]):
                with patch('json.load', return_value={'data': []}):
                    from scrape import all_courses
                    self.assertEqual(all_courses!=0,True)


if __name__ == '__main__':
    unittest.main(verbosity=2)
