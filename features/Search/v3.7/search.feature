Feature: able to search
@desktop

Scenario: able to search by text
	When user open "www.google.com"
	And type "lapin" in "search_input_form"
	Then browser should navigate to "Search_Result_Page"
	And url contains "lapin"

Scenario: able to search by category
	When user open "www.google.com"
	And select "car" from "category_list"
	Then browser should navigate to "Search_Result_Page"
	And url contains "car"