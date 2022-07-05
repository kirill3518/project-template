import { renderBlock } from './lib.js'

function pad(n) {
  if (n < 10)
    return '0' + n;
  return n;
}

export function renderSearchFormBlock(dateIn: Date, dateOut: Date) {
  // console.log(dateIn, dateOut)
  const minDay = new Date() // текущая дата (минимальная дата заезда)
  let date1 = dateIn ? dateIn : new Date(minDay.getTime() + 24 * 60 * 60 * 1000) // дата заезда (в том числе и дата заезда по умолчанию)
  if (date1 < minDay) {
    date1 = minDay
  }

  // console.log(minDay, date1)

  const lastDay = new Date(minDay.getFullYear(), minDay.getMonth() + 2, 0)
  const maxDay = new Date(lastDay.setTime(lastDay.getTime() + 24 * 60 * 60 * 1000 - 1000)) // максимальная дата выезда

  let date2 = dateOut ? dateOut : new Date(minDay.getTime() + 24 * 60 * 60 * 1000 * 2) // дата выезда (в том числе и дата выезда по умолчанию)
  if (date2 > maxDay) {
    date2 = maxDay
  }
  // console.log(maxDay, date2)

  renderBlock(
    'search-form-block',
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${date1.getFullYear()}-${pad(date1.getMonth() + 1)}-${pad(date1.getDay())}" min="2021-05-11" max="2021-06-30" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${date2.getFullYear()}-${pad(date2.getMonth() + 1)}-${pad(date2.getDay())}" min="2021-05-11" max="2021-06-30" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}
