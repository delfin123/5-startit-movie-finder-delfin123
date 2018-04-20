Feature: Cast and review blocks

  Scenario: Cast block should show at least one actor
    Given user on home page
    When user is searching for the movie "The Lord of the Rings" on the page
    Then user chooses the 1 in a block movie in search results
    Then user expects that images of actors are present on the page in quantity more than 0

  Scenario: Review block should contain at least one review
    Given user on home page
    When user is searching for the movie "Thor 3" on the page
    Then user chooses the 2 in a block movie in search results
    Then user expects that review block contains at least 1 review and has some text

  Scenario: Review should have reviewer name as link to source
    Given user on home page
    When user is searching for the movie "Pacific Rim" on the page
    Then user chooses the 1 in a block movie in search results
    Then user expects that review block contains at least 1 review and the first review contain outer link
    Then user follows this outer link and verify that it works and has some content