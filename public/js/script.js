const form = document.getElementById('form')
const fullname = document.getElementById('fullname')
const email = document.getElementById('email')
const cpf = document.getElementById('cpf')
const numbercvv = document.getElementById('numbercvv')
const cardFlag = document.getElementById('flag')
const shelfLife = document.getElementById('shelf-life')


function liveValidation() {

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log(fullname)
    console.log(cardFlag.value)
    // verifyInputs()
  })

  fullname.addEventListener('input', e => {
    e.preventDefault()
    const fullnameValue = fullname.value.trim();
    if (fullnameValue === '') {
      errorValidation(fullname, 'Campo obrigatório!')
    } else {
      successValidation(fullname)
    }
  })
  cpf.addEventListener('input', e => {
    e.preventDefault()
    const cpfValue = cpf.value.trim();
    if (cpfValue === '') {
      errorValidation(cpf, 'Campo obrigatório!')
    } else if (cpfValue.length < 14) {
      errorValidation(cpf, 'CPF Inválido!')
    } else {
      successValidation(cpf)
    }
  })

  email.addEventListener('input', e => {
    e.preventDefault()
    const emailValue = email.value.trim();
    console.log(emailValue)
    if (emailValue === '') {
      errorValidation(email, 'Campo obrigatório!')
    } else if (emailValue.indexOf('@') === -1 || emailValue.indexOf('.') === -1) {
      errorValidation(email, 'Email inválido!')
    } else {
      successValidation(email)
    }
  })

  numbercvv.addEventListener('input', e => {
    e.preventDefault()
    const numbercvvValue = numbercvv.value.trim();
    if (numbercvvValue === '') {
      errorValidation(numbercvv, 'Campo obrigatório!')
    } else if (numbercvvValue.length < 3) {
      errorValidation(numbercvv, 'Padrão inválido para o CVV!')
    } else {
      successValidation(numbercvv)
    }
  })

  cardFlag.addEventListener('input', e => {
    e.preventDefault()
    const cardFlagValue = cardFlag.value.trim();
    if (cardFlagValue === 'initial') {
      errorValidation(cardFlag, 'Selecione uma bandeira!')
    } else {
      successValidation(cardFlag)
    }
  })

  shelfLife.addEventListener('input', e => {
    e.preventDefault()
    const shelfLifeValue = shelfLife.value.trim();
    if (shelfLifeValue === '') {
      errorValidation(shelfLife, 'Campo obrigatório!')
    } else if (shelfLifeValue.length < 7) {
      errorValidation(shelfLife, 'Informe o mês e o ano corretamente.')
    } else {
      successValidation(shelfLife)
    }
  })
}

liveValidation()

function verifyInputs() {
  const fullnameValue = fullname.value.trim();
  // console.log(fullnameValue)
  const emailValue = email.value.trim();
  const cpfValue = cpf.value.trim();
  const numbercvvValue = numbercvv.value.trim();
  const cardFlagValue = cardFlag.value.trim();
  const shelfLifeValue = shelfLife.value.trim();

  if (fullnameValue === '') {
    errorValidation(fullname, 'Campo obrigatório!')
  } else {
    successValidation(fullname)
  }

  if (emailValue === '') {
    errorValidation(email, 'Campo obrigatório!')
  } else {
    successValidation(email)
  }

  if (cpfValue === '') {
    errorValidation(cpf, 'Campo obrigatório!')
  } else if (cpfValue.length < 14) {
    errorValidation(cpf, 'CPF Inválido!')
  } else {
    successValidation(cpf)
  }

  if (numbercvvValue === '') {
    errorValidation(numbercvv, 'Campo obrigatório!')
  } else if (numbercvvValue.length < 3) {
    errorValidation(numbercvv, 'Padrão inválido para o CVV!')
  } else {
    successValidation(numbercvv)
  }

  if (cardFlagValue === 'initial') {
    errorValidation(cardFlag, 'Selecione uma bandeira!')
  } else {
    successValidation(cardFlag)
  }

  if (shelfLifeValue === '') {
    errorValidation(shelfLife, 'Campo obrigatório!')
  } else if (shelfLifeValue.length < 7) {
    errorValidation(shelfLife, 'Informe o mês e o ano corretamente.')
  } else {
    successValidation(shelfLife)
  }

}

function errorValidation(input, message) {
  const formControl = input.parentElement;
  // console.log(formControl)
  const small = formControl.querySelector('small')

  small.innerText = message

  formControl.className = 'input error'
}

function successValidation(input) {
  const formControl = input.parentElement;

  formControl.className = 'input success'
}

function maskCpf() {
  const masks = {
    cpf(value) {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
    },
    shelfLife(value) {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
    }
  };

  document.getElementById('cpf').addEventListener(
    "input",
    e => {
      e.target.value = masks['cpf'](e.target.value);
    },
    false
  )

  document.getElementById('shelf-life').addEventListener(
    "input",
    e => {
      e.target.value = masks['shelfLife'](e.target.value);
    },
    false
  )
}

maskCpf();


function calculateTotal() {
  const quantity = document.getElementById('quantity')
  const price = document.getElementsByClassName('price')
  let priceConvert = parseFloat(price[0].innerHTML.replace(',', '.').substring(2).trim())
  let result = quantity.value * priceConvert
  document.getElementById('totalPrice').value = `R$ ${result.toFixed(2).replace('.', ',')}`
}

