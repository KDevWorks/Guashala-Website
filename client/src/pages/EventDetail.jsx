import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, User, Phone, Share2, ArrowLeft } from 'lucide-react';
import SEO from '../components/common/SEO';
import AnimatedSection from '../components/common/AnimatedSection';
import { events } from '../data/placeholderData';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const event = events.find(e => e.id === id || e.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen bg-cream-50 pt-32 pb-20 flex flex-col items-center justify-center text-center">
        <h1 className="font-heading text-4xl text-charcoal-900 mb-4">Event Not Found</h1>
        <p className="text-charcoal-600 mb-8">The event you are looking for does not exist or has been removed.</p>
        <Link to="/events" className="btn-primary">Back to Events</Link>
      </div>
    );
  }

  const formatDateFull = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleRegister = () => {
    alert("Thank you for your interest! Registration functionality will be implemented soon.");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out this event: ${event.title}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Event link copied to clipboard!");
    }
  };

  // Find some related events
  const relatedEvents = events.filter(e => e.id !== event.id).slice(0, 2);

  return (
    <div className="bg-cream-50 min-h-screen">
      <SEO 
        title={`${event.title} | Gaushala Events`} 
        description={event.description.substring(0, 150) + '...'} 
      />

      {/* Hero Image Section */}
      <section className="relative h-[50vh] md:h-[60vh] min-h-[400px] w-full mt-20">
        <img 
          src={event.image || "https://images.unsplash.com/photo-1596733430284-f743727521a5?q=80&w=1200&auto=format&fit=crop"} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        
        <div className="absolute inset-0 flex flex-col justify-end container-custom pb-12 z-10">
          <Link to="/events" className="inline-flex items-center text-white/80 hover:text-white mb-6 font-body text-sm transition-colors w-fit">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all events
          </Link>
          <div className="inline-block bg-saffron-500 text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase mb-4 w-fit">
            {event.category || 'Special Event'}
          </div>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-white font-bold max-w-4xl leading-tight">
            {event.title}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Content (Main details) */}
            <div className="lg:col-span-2 space-y-8">
              <AnimatedSection className="bg-white p-8 rounded-2xl shadow-sm border border-cream-100">
                <h2 className="font-heading text-2xl text-charcoal-900 mb-6">About The Event</h2>
                <div className="prose prose-lg text-charcoal-600 font-body">
                  <p className="whitespace-pre-line">{event.description}</p>
                  
                  {/* Additional placeholder details for visual completeness */}
                  <p className="mt-4">
                    Join us for an inspiring experience dedicated to the welfare of our sacred cows. 
                    This event brings together compassionate individuals to contribute to a noble cause 
                    while learning about sustainable practices and animal care.
                  </p>
                  <p className="mt-4">
                    Your presence and support make a significant difference in the lives of the animals we care for.
                    We look forward to welcoming you.
                  </p>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Sidebar (Details & Action) */}
            <div className="lg:col-span-1">
              <AnimatedSection className="bg-white p-8 rounded-2xl shadow-sm border border-cream-100 sticky top-28">
                <h3 className="font-heading text-xl text-charcoal-900 mb-6 border-b border-cream-100 pb-4">Event Details</h3>
                
                <ul className="space-y-6 font-body">
                  <li className="flex items-start">
                    <Calendar className="w-6 h-6 text-saffron-500 mr-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-charcoal-500 font-semibold uppercase tracking-wider mb-1">Date</p>
                      <p className="text-charcoal-900 font-medium">{formatDateFull(event.date)}</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <Clock className="w-6 h-6 text-saffron-500 mr-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-charcoal-500 font-semibold uppercase tracking-wider mb-1">Time</p>
                      <p className="text-charcoal-900 font-medium">{event.time || '10:00 AM - 4:00 PM'}</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <MapPin className="w-6 h-6 text-saffron-500 mr-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-charcoal-500 font-semibold uppercase tracking-wider mb-1">Location</p>
                      <p className="text-charcoal-900 font-medium">{event.location}</p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <User className="w-6 h-6 text-saffron-500 mr-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-charcoal-500 font-semibold uppercase tracking-wider mb-1">Organizer</p>
                      <p className="text-charcoal-900 font-medium">Gaushala Trust Board</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-cream-100 space-y-4">
                  <button 
                    onClick={handleRegister}
                    className="btn-primary w-full justify-center text-lg py-3"
                  >
                    Register for Event
                  </button>
                  <button 
                    onClick={handleShare}
                    className="btn-outline w-full justify-center flex items-center gap-2 py-3"
                  >
                    <Share2 className="w-5 h-5" /> Share Event
                  </button>
                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <section className="section-padding bg-white border-t border-cream-200">
          <div className="container-custom">
            <h2 className="font-heading text-3xl text-charcoal-900 mb-8 text-center">Other Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedEvents.map(relatedEvent => (
                <Link 
                  key={relatedEvent.id} 
                  to={`/events/${relatedEvent.id}`}
                  className="flex bg-cream-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-cream-100 group"
                >
                  <div className="w-1/3 min-w-[120px]">
                    <img 
                      src={relatedEvent.image || "https://images.unsplash.com/photo-1596733430284-f743727521a5?q=80&w=400&auto=format&fit=crop"} 
                      alt={relatedEvent.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="w-2/3 p-4 flex flex-col justify-center">
                    <span className="text-saffron-600 text-xs font-bold uppercase mb-1 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" /> {new Date(relatedEvent.date).toLocaleDateString()}
                    </span>
                    <h4 className="font-heading text-lg font-bold text-charcoal-900 mb-2 line-clamp-1 group-hover:text-saffron-600 transition-colors">
                      {relatedEvent.title}
                    </h4>
                    <p className="text-charcoal-500 text-sm line-clamp-2">
                      {relatedEvent.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default EventDetail;
