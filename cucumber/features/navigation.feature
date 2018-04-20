Feature:Navigation

  Scenario: Should open "Upcoming movies" section
    Given user on home page
    When user opens "Upcoming movies" section
    Then user expects appropriate to "Up Coming Movies" section movies are present on the page

  Scenario: Should open "Popular Series" section
    Given user on home page
    When user opens "Popular series" section
    Then user expects appropriate to "Popular Series" section movies are present on the page

  Scenario: Should open "Action" category
    Given user on home page
    When user opens "Action" section
    Then user expects appropriate to "Action" section movies are present on the page