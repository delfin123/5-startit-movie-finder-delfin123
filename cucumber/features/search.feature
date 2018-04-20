Feature: Search

  Scenario: Searching by existing name, should show first movie with complete name match
    Given user on home page
    When user is searching for the movie "Pacific Rim" on the page
    Then user expects that name of the first found film completely match with the name of film "Pacific Rim"

  Scenario: Search results(all of them) should contain search request
    Given user on home page
    When user is searching for the movie "Lord of the Rings" on the page
    Then user expects that all movie names in search results contain the name "Lord of the Rings"

  Scenario: Search results should be empty after request for nonexistent movie
    Given user on home page
    When user is searching for the movie "dhcr" on the page
    Then user expects that search results are empty