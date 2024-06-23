const handler = () => {
  const form = document.getElementById('profile_form_edit') as HTMLFormElement
  const nameTitle = document.getElementById('user_name') as HTMLHeadingElement
  const name = document.getElementById('div_name') as HTMLDivElement
  const submitButton = document.getElementById('save_profile') as HTMLButtonElement
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
        nameTitle.textContent = formData.get('fullName') as string
        name.textContent = formData.get('fullName') as string
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
