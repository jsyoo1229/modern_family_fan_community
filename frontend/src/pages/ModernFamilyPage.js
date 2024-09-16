import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ShowInfo from './ShowInfo';
import Characters from './Characters';
import Episodes from './Episodes';

const ModernFamilyPage = () => {
  return (
    <main id="main">
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-9" data-aos="fade-up">
              <h1 className="category-title">Modern Family</h1>
              <Routes>
                <Route index element={<ShowInfo />} />
                <Route path="characters" element={<Characters />} />
                <Route path="episodes" element={<Episodes />} />
              </Routes>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ModernFamilyPage;