'use client'
import s from "./page.module.scss"
import { useState } from "react"

export default function Page() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    carModel: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/send-to-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });


      const data = await res.json();
      if (!res.ok) {
        console.error('Ошибка от API-роута:', data);
        throw new Error(data.error || `Status ${res.status}`);
      }

      console.log('Запись успешно создана:', data);
      setFormData({ firstName: '', lastName: '', phone: '', carModel: '', notes: '' });
      alert('Ваша заявка принята! Мы скоро свяжемся с вами.');
    } catch (err) {
      const errorMessage = err instanceof Error
        ? err.message
        : 'Произошла неизвестная ошибка';

      console.error('Ошибка при создании записи:', err);
      alert(`Произошла ошибка: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Запись на мойку</h1>
      <p className={s.subtitle}>Оставьте контакты и мы свяжемся с вами для уточнения деталей</p>

      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.formGroup}>
          <label htmlFor="firstName" className={s.label}>Имя *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={s.input}
            required
          />
        </div>

        <div className={s.formGroup}>
          <label htmlFor="lastName" className={s.label}>Фамилия</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={s.input}
          />
        </div>

        <div className={s.formGroup}>
          <label htmlFor="phone" className={s.label}>Телефон *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={s.input}
            placeholder="+7 (___) ___-__-__"
            required
          />
        </div>

        <div className={s.formGroup}>
          <label htmlFor="carModel" className={s.label}>Модель авто</label>
          <input
            type="text"
            id="carModel"
            name="carModel"
            value={formData.carModel}
            onChange={handleChange}
            className={s.input}
            placeholder="Например: Toyota Camry"
          />
        </div>

        <div className={s.formGroup}>
          <label htmlFor="notes" className={s.label}>Комментарий</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className={s.textarea}
            placeholder="Особые пожелания или примечания"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className={s.submitButton}
          disabled={loading}
        >
          {loading ? 'Отправляем...' : 'Отправить заявку'}
        </button>
      </form>
    </div>
  )
}
