const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await auth.register({
      name: formData.fullName,
      email: formData.email,
      phone: formData.mobile,
      city: formData.city,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      roomType: formData.roomType,
      budget: formData.budget,
      notes: formData.notes
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Registration failed:", result);
      alert(result.message || "Registration failed");
      setIsSubmitting(false);
      return;
    }

    // ✅ SUCCESS (Real backend success)
    setIsSuccess(true);
    setIsSubmitting(false);

    if (result.token) {
      localStorage.setItem("authToken", result.token);
    }

    const userData = result.user || {
      name: formData.fullName,
      email: formData.email,
      phone: formData.mobile,
      city: formData.city
    };

    setTimeout(() => {
      setIsSuccess(false);

      if (onRegistrationSuccess) {
        onRegistrationSuccess(userData);
      }

      onClose();

      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        city: '',
        checkIn: '',
        checkOut: '',
        roomType: 'shared',
        budget: '',
        notes: ''
      });
    }, 1500);

  } catch (error) {
    console.error("Network / Server error:", error);
    alert("Server error. Please try again later.");
    setIsSubmitting(false);
  }
};
