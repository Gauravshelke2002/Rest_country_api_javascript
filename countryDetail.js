const countryName = new URLSearchParams(location.search).get('name')
const Name = document.querySelector(".hero-detail-col h3")
const countryFlag = document.querySelector(".hero-detail-card  img")
const native = document.querySelector(".native-name")
const countryPopulation = document.querySelector(".population")
const countryRegion = document.querySelector(".region")
const countrySubRegion = document.querySelector(".sub-region")
const countryCapital = document.querySelector(".capital")
const topLevelDomain = document.querySelector(".tod")
const countryLanguage = document.querySelector(".languages")
const countryBorders = document.querySelector(".border")
const currencies = document.querySelector('.currencies')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    console.log(country)
    Name.innerText = country.name.common
    countryFlag.src = country.flags.svg
    countryPopulation.innerText = country.population.toLocaleString('en-IN')
    countryRegion.innerText = country.region
    topLevelDomain.innerText = country.tld.join(', ')

    if (country.capital) {
      countryCapital.innerText = country.capital?.[0]
    }

    if (country.subregion) {
      countrySubRegion.innerText = country.subregion
    }

    if (country.name.nativeName) {
      native.innerText = Object.values(country.name.nativeName)[0].common
    } else {
      native.innerText = country.name.common
    }

    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(', ')
    }

    if (country.languages) {
      countryLanguage.innerText = Object.values(country.languages).join(', ')
    }

    if (country.borders) {
      
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            // console.log(borderCountry)
            const borderCountryTag = document.createElement('a')
            borderCountryTag.innerText = borderCountry.name.common
            borderCountryTag.href = `countryDetail.html?name=${borderCountry.name.common}`
            countryBorders.append(borderCountryTag)
          })
      })
    }

  })