todo: 

- [x] jwt route protection
- [x] jwt role based protection 
- [x] dont list dev user on get users
- [ ] helmet security : 
  ```js
  this.helmetSecurity = (helmet) => {
    this.app.use(helmet());
    this.app.use(helmet.hsts({
      maxAge: 5184000,
      includeSubDomains: true
    }));

    this.app.use(helmet.permittedCrossDomainPolicies());
    this.app.use(helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' }));
    this.app.use(helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ['\'self\''],
        scriptSrc: ['\'self\'', '\'unsafe-inline\''],
        styleSrc: ['\'self\'', '\'unsafe-inline\'', 'fonts.googleapis.com', 'https://stackpath.bootstrapcdn.com'],
        fontSrc: ['\'self\'', 'fonts.googleapis.com', 'fonts.gstatic.com', 'https://stackpath.bootstrapcdn.com'],
        imgSrc: ['\'self\'', 'data:', 'https://insomnia.rest']
      }
    }));
  ```
- [ ] tests (headleas) 
- [ ] serve frontend - routing : 
  ```js
  this.addRouting = route => {
    /* homepage route */
    this.app.get('/', (req, res) => {
      return res.sendFile(path
        .join(__dirname, '/public', 'dist', 'index.html'));
    });

    /* API routes */
    this.app.use('/api/', route.userRoutes);

    /* ANY route */
    this.app.get('*', (req, res) => {
      return res.sendFile(path
        .join(__dirname, '/public', 'dist', 'index.html'));
    });

    return this;
  };

  /** @staticFilesHandler
     * Function to serve static files
     * @returns {this} reference to the express app
     */
  this.serveStaticFiles = () => {
    this.app.use('/', express.static(path
      .join(__dirname, '/public', 'dist')));
    return this;
  };

  ```

- [ ] update doc 