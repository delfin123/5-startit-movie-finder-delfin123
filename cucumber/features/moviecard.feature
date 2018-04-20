Feature: Movie card

Scenario: Movie card should have name
    Given user on home page
    Then user expects movie cards are present on the page
    Then user expects that movie cards have name

Scenario: Movie card should have "rating" pointer
    Given user on home page
    Then user expects movie cards are present on the page
    Then user expects that movie cards have rating pointer

Scenario: Should open appropriate "movie details" page after click on "name" field of the movie card
    Given user on home page
    Then user is searching for the movie "Spirited Away" on the page
    Then after click on movie details user expects that appropriate "movie details" page for this movie is opened