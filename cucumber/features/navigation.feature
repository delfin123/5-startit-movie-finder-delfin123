Feature:Navigation

  Scenario: should open "Upcoming movies" section'
    Given I am on home page
    When I open "Upcoming movies" section
    Then I see appropriate to "Upcoming movies" section movies

  Scenario: should open "Popular Series" section'
    Given I am on home page
    When I open "Popular series" section
    Then I see appropriate to "Popular series" section movies

  Scenario: 'should open "Action" category'
    Given I am on home page
    When I open "Action" section
    Then I see appropriate to "Action" section movies