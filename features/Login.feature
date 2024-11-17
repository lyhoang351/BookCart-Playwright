Feature: Login
  Scenario: Login successfully
    Given Navigate to Login Page
    When Fill in Login form with "username123" and "123456aA@"
    Then Verify that URL does not contain login
    Then Verify that current username is equal with "username123"