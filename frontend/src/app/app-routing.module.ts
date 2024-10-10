import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//pages
import { Privacy } from './pages/Privacy/privacy.component';
import { News } from './pages/AllNews/News/news.component';
import { AllNews } from './pages/AllNews/allNews.component';
import { Categories } from './pages/Categories/categories.component';
import { CategoryProducts } from './pages/Products/categoryProducts.component';
import { Faq } from './pages/FAQ/faq.component';
import { Home } from './pages/Home/home.component';
import { Media } from './pages/Media/media.component';
import { PageError } from './pages/page-not-found/page-not-found.component';
import { Product } from './pages/Products/Product/product.component';
import { Oferta } from './pages/Oferta/oferta.component';
import { PaymentTerms } from './pages/Payment-terms/payment-terms.component';
import { Refund } from './pages/Refund/refund.component';
import { PrivacyPolicy } from './pages/Privacy-policy/privacy-policy.component';
import { Pricing } from './pages/Pricing/pricing.component';
import { ErrorPage } from './pages/error/Error/error.component';
import { AllArtists } from './pages/Artists/artists.component';

const routes: Routes = [
  { path: '', component: Home, title: 'MHT | Home' },
  { path: 'faq', component: Faq, title: 'MHT | Faq' },
  { path: 'media', component: Media, title: 'MHT | Media' },
  { path: 'categories', component: Categories, title: 'MHT | Categories' },
  { path: 'news', component: AllNews, title: 'MHT | All News' },
  { path: 'news/:id', component: News, title: 'MHT | News' },
  { path: 'products/:id', component: CategoryProducts, title: 'MHT | Category Products' },
  { path: 'product/:id', component: Product, title: 'MHT | Product' },
  { path: 'artists', component: AllArtists, title: 'MHT | Artists' },
  { path: 'oferta', component: Oferta, title: 'MHT | Oferta' },
  { path: 'privacy', component: Privacy, title: 'MHT | Privacy' },
  { path: 'privacy-policy', component: PrivacyPolicy, title: 'MHT | Privacy Policy' },
  { path: 'payment-terms', component: PaymentTerms, title: 'MHT | Payment Terms' },
  { path: 'refund', component: Refund, title: 'MHT | Refund' },
  { path: 'pricing', component: Pricing, title: 'MHT | Pricing' },
  { path: 'error', component: ErrorPage, title: 'MHT | Unhandled Error' },
  { path: '**', component: PageError, title: 'MHT | Error' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
