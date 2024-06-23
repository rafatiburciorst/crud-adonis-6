const handler = () => {
  const form = document.getElementById('formPassword') as HTMLFormElement
  const submitButton = document.getElementById('submit') as HTMLButtonElement
  form.onsubmit = async (event: SubmitEvent) => {
    event.preventDefault()
    submitButton.disabled = true
    try {
      const formData = new FormData(form)
      const response = await fetch(form.action, {
        method: 'PUT',
        body: formData,
      })
      if (response.ok) {
      } else {
        throw new Error('Failed to update profile')
      }
      submitButton.disabled = false
    } catch (error) {
      submitButton.disabled = false
      console.error(error)
    }
  }
}

window.onload = handler
