import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { enableProdMode } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageTransitionModule } from 'ngx-acuw';
//translate
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

//pipes
import { CustomCurrencyPipe } from './core/Pipes/customCurrencyPipe';
//components
import { AppComponent } from './app.component';
import { AppWrapper } from './components/AppWrapper/appWrapper.component';
import { Footer } from './components/AppWrapper/Footer/footer.component';
import { Header } from './components/AppWrapper/Header/header.component';
import { HomeCarouselComponent } from './components/Carousels/home-carousel/home-carousel.component';
import { NewsItemComponent } from './components/News/news-item/news-item.component';
import { BootstrapCarouselComponent } from './components/Carousels/bootstrap-carousel/bootstrap-carousel.component';
import { MediaItem } from './components/Media/media-item/media-item.component';
import { PaginationComponent } from './components/Pagination/pagination.component';
import { FaqItemComponent } from './components/FAQ/faq-item/faq-item.component';
import { CategoryItemComponent } from './components/Category/category-item/category-item.component';
import { ProductItemComponent } from './components/Product/product-item/product-item.component';
import { PricingItemComponent } from './components/Pricing/pricing-item/pricing-item.component';
import { ProductDetailsComponent } from './components/ProductDetails/productDetails.component';
import { PaymentNotificationComponent } from './components/Notifications/payment-notification/payment-notification.component';
import { BurgerHeader } from './components/AppWrapper/burger-header/burger-header.component';
import { Loader } from './components/Loader/loader.component';
import { Error } from './components/Error/error.component';
import { NavBarItemsComponent } from './components/AppWrapper/Header/nav-bar-items/nav-bar-items.component';
import { NavBarItemComponent } from './components/AppWrapper/Header/nav-bar-items/nav-bar-item/nav-bar-item.component';
import { FooterLinkItemComponent } from './components/AppWrapper/Footer/footer-link-item/footer-link-item.component';
import { ArtistComponent } from './components/AllArtists/ArtistItem/artist.component';
import { AllArtistsComponent } from './components/AllArtists/all-artists.component';
//pages
import { Media } from './pages/Media/media.component';
import { Categories } from './pages/Categories/categories.component';
import { Faq } from './pages/FAQ/faq.component';
import { Home } from './pages/Home/home.component';
import { CategoryProducts } from './pages/Products/categoryProducts.component';
import { Product } from './pages/Products/Product/product.component';
import { AllNews } from './pages/AllNews/allNews.component';
import { News } from './pages/AllNews/News/news.component';
import { Oferta } from './pages/Oferta/oferta.component';
import { Privacy } from './pages/Privacy/privacy.component';
import { Refund } from './pages/Refund/refund.component';
import { PrivacyPolicy } from './pages/Privacy-policy/privacy-policy.component';
import { PaymentTerms } from './pages/Payment-terms/payment-terms.component';
import { Pricing } from './pages/Pricing/pricing.component';
import { PageError } from './pages/page-not-found/page-not-found.component';
import { ErrorPage } from './pages/error/Error/error.component';
import { AllArtists } from './pages/Artists/artists.component';

enableProdMode();

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    PageError,
    AppComponent,
    AppWrapper,
    Header,
    Footer,
    Categories,
    Faq,
    MediaItem,
    News,
    Home,
    CategoryProducts,
    Product,
    AllNews,
    Media,
    HomeCarouselComponent,
    NewsItemComponent,
    PaginationComponent,
    BootstrapCarouselComponent,
    FaqItemComponent,
    CategoryItemComponent,
    ProductItemComponent,
    Oferta,
    Privacy,
    Refund,
    PrivacyPolicy,
    PaymentTerms,
    Pricing,
    PricingItemComponent,
    ProductDetailsComponent,
    PaymentNotificationComponent,
    BurgerHeader,
    Loader,
    ErrorPage,
    Error,
    NavBarItemsComponent,
    NavBarItemComponent,
    FooterLinkItemComponent,
    ArtistComponent,
    AllArtistsComponent,
    AllArtists,
    CustomCurrencyPipe,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ImageTransitionModule,
    FormsModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'uk',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
