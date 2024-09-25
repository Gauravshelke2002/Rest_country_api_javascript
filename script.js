const countryStore = document.querySelector(".country-store");
const filterByRegion = document.querySelector(".filter-by-region");
const search = document.querySelector(".search-container input")
// const theme = document.querySelector('.theme')


let containerData

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    render(data)
    containerData = data
 
  });

  filterByRegion.addEventListener("change", (e) => {
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
      .then((res) => res.json())
      .then(render)
  });

  search.addEventListener("input",(e) => {
    const searchCountry = containerData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
     render(searchCountry)
  })

 
  

function render(data) {
  countryStore.innerHTML = "";
  data.forEach((country) => {
    // console.log(country);
    const countryCol = document.createElement("a");
    countryCol.classList.add("country-card", "col-md-3");
    countryCol.href = `countryDetail.html?name=${country.name.common}`;

    countryCol.innerHTML = `
                         <div class="card hero-section-card ">
                            <div class="card-header p-0">
                                <img src="${country.flags.svg}" alt="${country.name.common} flag" class="w-100 ">
                            </div>
                            <div class="card-body ">
                                <div class="card-text " >
                                    <h3 class="card-title  ">${country.name.common}</h3>
                                    <p><b>Population: </b>${country.population.toLocaleString("en-IN" )}</p>
                                    <p><b>Region: </b>${country.region}</p>
                                    <p><b>Capital: </b>${country.capital?.[0]}</p>
                                  </div>
                            </div>
                        </div>
      `;
    countryStore.append(countryCol);
  });
}



