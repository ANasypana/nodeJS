
const amountReviews = arr => {
  const transfArr = arr.map(elm => {
    const arrReviews2020 = elm.reviews.filter(rev => rev.date.split(' ').length === 3);

    if(arrReviews2020.length > 0){
      const dateAmount = {}
      const december = elm.reviews.filter(rev => (rev.date.split(' ').length === 3) && rev.date.split(' ')[1] === 'декабря').length;
      if(december > 0) dateAmount.december = december;
      const november = elm.reviews.filter(rev => (rev.date.split(' ').length === 3) && rev.date.split(' ')[1] === 'ноября').length;
      if(november > 0) dateAmount.november = november;
      const october = elm.reviews.filter(rev => (rev.date.split(' ').length === 3) && rev.date.split(' ')[1] === 'октября').length;
      if(october > 0) dateAmount.october = october;
      const september = elm.reviews.filter(rev => (rev.date.split(' ').length === 3) && rev.date.split(' ')[1] === 'сентября').length;
      if(september > 0) dateAmount.september = september;
      const august = elm.reviews.filter(rev => (rev.date.split(' ').length === 3) && rev.date.split(' ')[1] === 'августа').length;
      if(august > 0) dateAmount.august = august;
      const july = elm.reviews.filter(rev => (rev.date.split(' ').length === 3) && rev.date.split(' ')[1] === 'июля').length;
      if(july > 0) dateAmount.july = july;
      const june = elm.reviews.filter(rev => (rev.date.split(' ').length === 3) && rev.date.split(' ')[1] === 'июня').length;
      if(june > 0) dateAmount.june = june;
      const may = elm.reviews.filter(rev => (rev.date.split(' ').length === 3) && rev.date.split(' ')[1] === 'мая').length;
      if(may > 0) dateAmount.may = may;
      const april = elm.reviews.filter(rev => (rev.date.split(' ').length === 3) && rev.date.split(' ')[1] === 'апреля').length;
      if(april > 0) dateAmount.april = april;
      const march = elm.reviews.filter(rev => (rev.date.split(' ').length === 3) && rev.date.split(' ')[1] === 'марта').length;
      if(march > 0) dateAmount.march = march;
      const february = elm.reviews.filter(rev => (rev.date.split(' ').length === 3) && rev.date.split(' ')[1] === 'февраля').length;
      if(february > 0) dateAmount.february = february;
      const january = elm.reviews.filter(rev => (rev.date.split(' ').length === 3) && rev.date.split(' ')[1] === 'января').length
      if(january > 0) dateAmount.january = january;

      delete elm.reviews
      return {...elm, dateAmount}
    }
    delete elm.reviews
    return elm

  })

  return transfArr
}

module.exports = amountReviews;
