Feature: Movie card

Scenario: should have name
    Given I am on home page
    Then I see movie cards loaded
    Then Movie Card should have name

Scenario: should have "raiting" pointer
    Given I am on home page
    Then I see movie cards loaded
    Then Movie Card should have raiting pointer

Scenario: should open appropriate "movie details" page, after click on "name" field
    Given I am on home page
    Then I search for film "Spirited Away" on the page
    Then After click on movie details i see appropriate "movie details" page