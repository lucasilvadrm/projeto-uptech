const form = document.getElementById('form')
const fullname = document.getElementById('fullname')
const email = document.getElementById('email')
const cpf = document.getElementById('cpf')
const numbercvv = document.getElementById('numbercvv')
const cardFlag = document.getElementById('flag')
const shelfLife = document.getElementById('shelf-life')

function cleanFields(elementValue) {
  return elementValue.trim();
}

const customMessageErrors = {
  requiredField: "Campo obrigatório!",
  emailValidation: "Email inválido!",
  cpfValidation: "CPF inválido!",
  cardFlagInfo: 'Selecione uma bandeira!',
  invalidCvv: 'Padrão inválido para o CVV!',
  shelfLifeValidation: 'Informe o mês e o ano corretamente.'
}

function liveValidation() {

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    verifyInputs()
  })

  fullname.addEventListener('input', e => {
    e.preventDefault()

    const fullnameValue = cleanFields(fullname.value);
    if (!fullnameValue) {
      errorValidation(fullname, customMessageErrors.requiredField)
    } else {
      successValidation(fullname)
    }
  })

  cpf.addEventListener('input', e => {
    e.preventDefault()

    const cpfValue = cleanFields(cpf.value);

    if (!cpfValue) {
      errorValidation(cpf, customMessageErrors.requiredField)
    } else if (cpfValue.length < 14) {
      errorValidation(cpf, customMessageErrors.cpfValidation)
    } else {
      successValidation(cpf)
    }

  })

  email.addEventListener('input', e => {
    e.preventDefault()
    const emailValue = cleanFields(email.value);

    if (!emailValue) {
      errorValidation(email, customMessageErrors.requiredField)
    } else if (emailValue.indexOf('@') === -1 || emailValue.indexOf('.') === -1) {
      errorValidation(email, customMessageErrors.emailValidation)
    } else {
      successValidation(email)
    }

  })

  numbercvv.addEventListener('input', e => {
    e.preventDefault()
    const numbercvvValue = cleanFields(numbercvv.value);

    if (!numbercvvValue) {
      errorValidation(numbercvv, customMessageErrors.requiredField)
    } else if (numbercvvValue.length < 3) {
      errorValidation(numbercvv, customMessageErrors.invalidCvv)
    } else {
      successValidation(numbercvv)
    }
  })

  cardFlag.addEventListener('input', e => {
    e.preventDefault()
    const cardFlagValue = cleanFields(cardFlag.value);

    if (cardFlagValue === 'initial') {
      errorValidation(cardFlag, customMessageErrors.cardFlagInfo)
    } else {
      successValidation(cardFlag)
    }
  })

  shelfLife.addEventListener('input', e => {
    e.preventDefault()
    const shelfLifeValue = cleanFields(shelfLife.value);

    if (!shelfLifeValue) {
      errorValidation(shelfLife, customMessageErrors.requiredField)
    } else if (shelfLifeValue.length < 7) {
      errorValidation(shelfLife, customMessageErrors.shelfLifeValidation)
    } else {
      successValidation(shelfLife)
    }
  })
}

liveValidation()

function verifyInputs() {
  const fullnameValue = fullname.value.trim();
  const emailValue = email.value.trim();
  const cpfValue = cpf.value.trim();
  const numbercvvValue = numbercvv.value.trim();
  const cardFlagValue = cardFlag.value.trim();
  const shelfLifeValue = shelfLife.value.trim();

  if (!fullnameValue) {
    errorValidation(fullname, customMessageErrors.requiredField)
  } else {
    successValidation(fullname)
  }

  if (!emailValue) {
    errorValidation(email, customMessageErrors.requiredField)
  } else {
    successValidation(email)
  }

  if (!cpfValue) {
    errorValidation(cpf, customMessageErrors.requiredField)
  } else if (cpfValue.length < 14) {
    errorValidation(cpf, customMessageErrors.cpfValidation)
  } else {
    successValidation(cpf)
  }

  if (!numbercvvValue) {
    errorValidation(numbercvv, customMessageErrors.requiredField)
  } else if (numbercvvValue.length < 3) {
    errorValidation(numbercvv, customMessageErrors.invalidCvv)
  } else {
    successValidation(numbercvv)
  }

  if (cardFlagValue === 'initial') {
    errorValidation(cardFlag, customMessageErrors.cardFlagInfo)
  } else {
    successValidation(cardFlag)
  }

  if (!shelfLifeValue) {
    errorValidation(shelfLife, customMessageErrors.requiredField)
  } else if (shelfLifeValue.length < 7) {
    errorValidation(shelfLife, customMessageErrors.shelfLifeValidation)
  } else {
    successValidation(shelfLife)
  }

}

function errorValidation(input, message) {
  const formControl = input.parentElement;

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

