Feature: Cast and review blocks

  Scenario: Cast block should show at least one actor
    Given I am on home page
    When I search for film "Lord of the Rings" on the page
    Then I choose 1 film at search results
    Then I see that images of actors on the page more than 0

  Scenario: Review block should contain at least one review
    Given I am on home page
    When I search for film "Thor 3" on the page
    Then I choose 2 film at search results
    Then I see that review block contains at least 1 review and has some text

  Scenario: Review should have reviewer name as link to source
    Given I am on home page
    When I search for film "Pacific Rim" on the page
    Then I choose 1 film at search results
    Then I see that review block contains at least 1 review and the first review contain outer link
    Then I can follow this outer link and verify that it works and has some content