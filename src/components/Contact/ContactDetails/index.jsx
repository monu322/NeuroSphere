import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

const Contact = () => {
  return (
    <section className="contact">
      <div className="container">
        <div className="row">
          {/* Contact Form */}
          <ContactForm />
          {/* Contact Info */}
          <ContactInfo />
        </div>
      </div>
    </section>
  )
}

export default Contact