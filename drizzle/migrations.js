import journal from './meta/_journal.json';
import m0000 from './0000_init database.sql';
import m0001 from './0001_seed translations.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001
    }
  }
  