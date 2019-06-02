Feature: homepage logo
	@smoke
	Scenario:
		When user open "https://minimorph223.github.io/lapin-browser/" page
		And the web should display element "Lapin_Logo"

	@regression
	Scenario:
		When user open "https://minimorph223.github.io/lapin-browser/" page
		And the web should display element "Lapin_Logo"