Feature: Movie details

  Scenario: should have movie name as header
    Given I am on home page
    When I search for film "The Maze Runner" on the page
    Then I choose 1 film at search results
    Then The name of film "The Maze Runner" should be as a header

  Scenario: should have rating
    Given I am on home page
    When I search for film "Matrix" on the page
    Then I choose 1 film at search results
    Then I see the rating of film

  Scenario: should have similar movies block with at least one movie
    Given I am on home page
    When I search for film "Wing Commander" on the page
    Then I choose 1 film at search results
    Then Count of similar movies more than 0
    Then I see that genres of 8 film at "Similar films" block includes 1 or more genres of requested film