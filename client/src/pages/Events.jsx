import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import SEO from '../components/common/SEO';
import AnimatedSection from '../components/common/AnimatedSection';
import { events } from '../data/placeholderData';

const Events = () => {
  const [filter, setFilter] = useState('Upcoming'); // 'Upcoming' or 'Past'

  const filteredEvents = useMemo(() => {
    const today = new Date();
    return events.filter(event => {
      const eventDate = new Date(event.date);
      if (filter === 'Upcoming') {
        return eventDate >= today;
      } else {
        return eventDate < today;
      }
    }).sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return filter === 'Upcoming' ? dateA - dateB : dateB - dateA;
    });
  }, [filter]);

  const formatDateBox = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return { month, day };
  };

  const formatDateFull = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      <SEO 
        title="Events | Gaushala Welfare" 
        description="Join our upcoming events, festivals, and volunteer drives at the Gaushala." 
      />

      {/* Page Hero */}
      <section className="bg-gradient-forest pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="container-custom relative z-10 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-6">Events & Activities</h1>
          <div className="flex items-center justify-center space-x-2 text-white/80 font-body text-sm md:text-base">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Events</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Header & Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-cream-200 pb-6">
            <AnimatedSection>
              <h2 className="section-heading text-charcoal-900 mb-2">Join Our Mission</h2>
              <p className="text-charcoal-600 font-body">Participate in our regular drives and special celebrations.</p>
            </AnimatedSection>

            <AnimatedSection className="mt-6 md:mt-0 flex bg-white p-1 rounded-full shadow-sm border border-cream-200">
              <button
                onClick={() => setFilter('Upcoming')}
                className={`px-6 py-2 rounded-full font-body text-sm font-semibold transition-colors ${
                  filter === 'Upcoming' ? 'bg-saffron-500 text-white shadow-md' : 'text-charcoal-600 hover:bg-cream-100'
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setFilter('Past')}
                className={`px-6 py-2 rounded-full font-body text-sm font-semibold transition-colors ${
                  filter === 'Past' ? 'bg-saffron-500 text-white shadow-md' : 'text-charcoal-600 hover:bg-cream-100'
                }`}
              >
                Past Events
              </button>
            </AnimatedSection>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredEvents.map((event, index) => {
                const dateBox = formatDateBox(event.date);
                return (
                  <AnimatedSection 
                    key={event.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-cream-100 flex flex-col"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={event.image || `https://images.unsplash.com/photo-1596733430284-f743727521a5?q=80&w=800&auto=format&fit=crop`} 
                        alt={event.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-center shadow-lg min-w-[70px]">
                        <span className="block text-saffron-600 font-bold text-sm uppercase">{dateBox.month}</span>
                        <span className="block text-charcoal-900 font-heading font-bold text-2xl">{dateBox.day}</span>
                      </div>
                      <div className="absolute top-4 right-4 bg-forest-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                        {event.category || 'Event'}
                      </div>
                    </div>

                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center text-charcoal-500 text-sm mb-3 space-x-4">
                        <span className="flex items-center"><Calendar className="w-4 h-4 mr-1 text-saffron-500" /> {formatDateFull(event.date)}</span>
                        <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-saffron-500" /> {event.location}</span>
                      </div>
                      
                      <h3 className="font-heading text-2xl font-bold text-charcoal-900 mb-3 group-hover:text-saffron-600 transition-colors">
                        {event.title}
                      </h3>
                      
                      <p className="text-charcoal-600 font-body mb-6 line-clamp-3">
                        {event.description}
                      </p>
                      
                      <div className="mt-auto pt-4 border-t border-cream-100">
                        <Link 
                          to={`/events/${event.id}`}
                          className="inline-flex items-center text-saffron-600 font-semibold hover:text-saffron-700 transition-colors"
                        >
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          ) : (
            <AnimatedSection className="bg-white rounded-2xl p-12 text-center border border-cream-200">
              <Calendar className="w-16 h-16 text-cream-300 mx-auto mb-4" />
              <h3 className="font-heading text-2xl text-charcoal-900 mb-2">No Events Found</h3>
              <p className="text-charcoal-500 font-body">
                There are currently no {filter.toLowerCase()} events to display. Please check back later.
              </p>
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;
