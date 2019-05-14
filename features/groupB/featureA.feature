Feature: srp page sectionTitle
    @za @desktop
    Scenario:
        When user open "home""/s-venta-motos/v1c69p1" page
        Then the web page should navigate to "SRP" page
        Given user a cookie with name "B20" and value "SRP" on the site
        Given user a cookie with name "AB-SRP-STYLEUPDATE-ZA" and value "true" on the site
        Given user a cookie with name "AB-SRP-Section-title" and value "true" on the site
        When user scroll "srp_sectionTitle" into view on "both" screen
        When user wait for "10" secs