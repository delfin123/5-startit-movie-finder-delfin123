Feature: Popular movies

  Scenario: shouldn't have search bar
    Given I am on home page
    When I open "Popular series" section
    Then I see appropriate to "Popular series" section movies
    Then I see that search bar is absent

  Scenario: should have "First Air Date" instead "Release Date"
    Given I am on home page
    When I open "Popular series" section
    Then I see that movie cards of films of this section contain "First Air Date" fraze