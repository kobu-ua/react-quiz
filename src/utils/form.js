export function createControl(cfg, validation) {
  return {
    ...cfg,
    validation,
    valid: !validation,
    touched: false,
    value: '',
  }
}

export function validate(value, validation = null) {
  if (!validation) return true;

  if (typeof value === 'string') {
    value = value.trim();
  }

  let isValid = true;

  if (validation.required && isValid) {
    isValid = value.trim() !== '';
  }

  return isValid;
}

export function validateForm(formControls) {
  let isFormValid = true;

  for (let control in formControls) {
    if(formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid;
    }
  }

  return isFormValid;
}