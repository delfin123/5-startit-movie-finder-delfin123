Feature: Movie details

  Scenario: should have movie name as header
    Given user on home page
    When user searches for the movie "The Maze Runner" on the page
    Then user chooses the 1 in a block movie in search results
    Then user expects that the name of film "The Maze Runner" should be as a header

  Scenario: should have rating
    Given user on home page
    When user searches for the movie "Matrix" on the page
    Then user chooses the 1 in a block movie in search results
    Then user expects that rating of film is present on the page

  Scenario: should have similar movies block with at least one movie
    Given user on home page
    When user searches for the movie "Wing Commander" on the page
    Then user chooses the 1 in a block movie in search results
    Then user expects that count of similar movies more than 0
    Then user expects that genres of 8 film at "Similar films" block includes 1 or more genres of requested film