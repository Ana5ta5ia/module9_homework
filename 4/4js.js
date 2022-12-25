let ok = document.querySelector('.ok');
      let inpOne = document.querySelector('.stringbut-1');
      let inpTwo = document.querySelector('.stringbut-2');
      const resultNode = document.getElementById('result');

      ok.addEventListener('click', () => {
         let valueOne = inpOne.value;
         let valueTwo = inpTwo.value;

         if ((valueOne >= 100 && valueOne <= 300) && (valueTwo >= 100 && valueTwo <= 300)) {
            fetch(`https://picsum.photos/${valueOne}/${valueTwo}`)
               .then((response) => {
                  resultNode.innerHTML = `<img src=${response.url}>`;
               })
               .catch(() => {
                  resultNode.innerHTML = `error`;
               })
         } else {
            resultNode.innerHTML = `Одно из чисел вне диапaзона от 100 до 300`;
         }
      });