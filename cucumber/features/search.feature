Feature: Search

  Scenario: by exisiting name, should show first movie with complete name match
    Given I am on home page
    When I search for film "Pacific Rim" on the page
    Then Name of the first found film completely match with the name of film "Pacific Rim"

  Scenario: results(all of them) should contain search request
    Given I am on home page
    When I search for film "Lord of the Rings" on the page
    Then All search results contains the name "Lord of the Rings"

  Scenario: result should be empty, after request for nonexistent movie
    Given I am on home page
    When I search for film "dhcr" on the page
    Then I see that search  results is empty