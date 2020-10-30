import React, { useState } from 'react';
import axios from 'axios';

const Contact = ({data}) => {
   const [state, setState] = useState({
      contactName: '',
      contactEmail: '',
      contactSubject: '',
      contactMessage: ''
    });

   const [result, setResult] = useState(null);

   const handleClick = event => {
      event.preventDefault();
      axios
       .post('/send', { ...state })
       .then(response => {
         setResult(response.data);
         setState({ contactName: '', contactEmail: '', contactSubject: '', contactMessage: '' });
       })
       .catch(() => {
         setResult({ success: false, message: 'Something went wrong. Try again later'});
     });
   }

   const onInputChange = event => {
      const { name, value } = event.target;
  
      setState({
        ...state,
        [name]: value
      });
    };
    

    return (
      <section id="contact">

         <div className="row section-head">

            <div className="two columns header-col">

               <h1><span>Get In Touch.</span></h1>

            </div>

            <div className="ten columns">

                  <p className="lead">{data?.message}</p>

                  {result && (
        <p>
          {result.message}
        </p>
      )}

            </div>

         </div>

         <div className="row">
            <div className="eight columns">

               <form id="contactForm" name="contactForm">
					<fieldset>

                  <div>
						   <label htmlFor="contactName">Name <span className="required">*</span></label>
						   <input value={state.contactName} type="text" defaultValue="" size="35" id="contactName" name="contactName" onChange={onInputChange}/>
                  </div>

                  <div>
						   <label htmlFor="contactEmail">Email <span className="required">*</span></label>
						   <input value={state.contactEmail} type="text" defaultValue="" size="35" id="contactEmail" name="contactEmail" onChange={onInputChange}/>
                  </div>

                  <div>
						   <label htmlFor="contactSubject">Subject</label>
						   <input value={state.contactSubject} type="text" defaultValue="" size="35" id="contactSubject" name="contactSubject" onChange={onInputChange}/>
                  </div>

                  <div>
                     <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                     <textarea value={state.contactMessage} onChange={onInputChange} cols="50" rows="15" id="contactMessage" name="contactMessage"></textarea>
                  </div>

                  <div>
                     <button type='submit' onClick={handleClick} className="submit">Submit</button>
                     <span id="image-loader">
                        <img alt="" src="images/loader.gif" />
                     </span>
                  </div>
					</fieldset>
				   </form>

           <div id="message-warning"> Error boy</div>
				   <div id="message-success">
                  <i className="fa fa-check"></i>Your message was sent, thank you!<br />
				   </div>
           </div>


            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">

					   <h4>Address and Phone</h4>
					   <p className="address">
						   {data?.name}<br />
						   {data?.address.street} <br />
						   {data?.address.city}, {data?.address.url} {data?.address.zip}<br />
						   <span>{data?.phone}</span>
					   </p>
				   </div>

               <div className="widget widget_tweets">

		         </div>
            </aside>
      </div>
   </section>
    );
}

export default Contact;
