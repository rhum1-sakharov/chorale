import {Headers, RequestOptions} from "@angular/http";
/**
 * Created by romain on 28/12/2016.
 */
export const FRENCH_CALENDAR = {
  firstDayOfWeek: 1,
  dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
  dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
  dayNamesMin: ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
  monthNames: ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"],
  monthNamesShort: ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juil", "Aou", "Sep", "Oct", "Nov", "Dec"]
};

export const AUTH = {
  'token': 'jwt_token',
  'redirectUrl': 'redirect_url',
  'redirectRole': 'redirect_role'
}



export const NG_THEMES = [
  {label: "aristo", value: 'aristo'},
  {label: "bootstrap", value: 'bootstrap'},
  {label: "cruze", value: 'cruze'},
  {label: "cupertino", value: 'cupertino'},
  {label: "darkness", value: 'darkness'},
  {label: "delta", value: 'delta'},
  {label: "flick", value: 'flick'},
  {label: "home", value: 'home'},
  {label: "lightness", value: 'lightness'},
  {label: "omega", value: 'omega'},
  {label: "pepper-grinder", value: 'pepper-grinder'},
  {label: "redmond", value: 'redmond'},
  {label: "rocket", value: 'rocket'},
  {label: "south-street", value: 'south-street'},
  {label: "start", value: 'start'},
  {label: "trontastic", value: 'trontastic'}
];

export const PHOTO_WIDTHS = [
  {label: "Taille originale", value: -1},
  {label: "64px", value: 64},
  {label: "128px", value: 128},
  {label: "192px", value: 192},
  {label: "256px", value: 256},
  {label: "512px", value: 512},
  {label: "800px", value: 800},
  {label: "1024px", value: 1024},
  {label: "2048px", value: 2048}
];

export const HEADERS_JSON = new Headers();
HEADERS_JSON.append('Accept', 'application/json');

export const OPTIONS = new RequestOptions({headers: HEADERS_JSON});





