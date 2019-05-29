Feature: homepage
	@smoke
	Scenario: open home page
		When user open "https://minimorph223.github.io/lapin-browser/" page
		Then the web should navigate to "Home" page

	Scenario: open page 
		When user open "https://minimorph223.github.io/lapin-browser/" page
		Then the web should navigate to "Home" page