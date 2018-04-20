Feature: Popular movies

  Scenario: "Popular series" section shouldn't have search bar
    Given user on home page
    When user opens "Popular series" section
    Then user expects appropriate to "Popular Series" section movies are present on the page
    Then user expects that search bar is absent on the page

  Scenario: "Popular series" section should have "First Air Date" instead "Release Date"
    Given user on home page
    When user opens "Popular series" section
    Then user expects that movie cards of films of this section contain "First Air Date" fraze