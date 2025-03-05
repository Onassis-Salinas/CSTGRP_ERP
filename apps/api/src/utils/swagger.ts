export const swaggerCss = `@media only screen and (prefers-color-scheme: dark) {
  a {
    color: #8c8cfa;
  }

  embed[type="application/pdf"] {
    filter: invert(90%);
  }

  html {
    background: #1f1f22 !important;
    box-sizing: border-box;
    filter: contrast(100%) brightness(100%) saturate(100%);
    overflow-y: hidden;
  }

  body {
    background: #1f1f22;
    background-color: #1f1f22;
    background-image: none !important;
    overflow-y: hidden;
  }

  font,
  html {
    color: #bfbfbf!important;
  }

  .swagger-ui,
  .swagger-ui section h3 {
    color: #b5bac9;
  }

  .swagger-ui a {
    background-color: transparent;
  }

  .swagger-ui mark {
    background-color: #664b00;
  }

  .swagger-ui .nested-links a {
    color: #99bae6;
    transition: color 0.15s ease-in 0s;
  }

  .swagger-ui .nested-links a:focus,
  .swagger-ui .nested-links a:hover {
    color: #a9cbea;
    transition: color 0.15s ease-in 0s;
  }

  .swagger-ui .opblock-tag {
    border-bottom: 1px solid rgba(58, 64, 80, 0.3);
    color: #b5bac9;
    transition: all 0.2s ease 0s;
    font-size: 14px !important;
    color: #fbfbfb !important;
    padding: 5px !important;
    height: 32px !important;
  }

  .swagger-ui .opblock {
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    margin: 0 0 15px;
  }

  .swagger-ui .opblock .tab-header .tab-item.active h4 span::after {
    color: gray;
  }

  .opblock .opblock-summary span {
    font-size: 14px;
  }

  .opblock .opblock-summary-method {
    font-size: 12px !important;
    min-width: 60px !important;
    padding: 4px 0 !important;
  }

  .swagger-ui .opblock.is-open .opblock-summary {
    border: none !important;
  }
  .swagger-ui .opblock.is-open .opblock-summary-control .opblock-summary-path {
    color: #fbfbfb !important;
  }

  .swagger-ui .opblock .opblock-section-header {
    background: rgba(28, 28, 33, 0.8);
    box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px;
  }

  .swagger-ui .opblock .opblock-section-header > label > span {
    padding: 0 10px 0 0;
  }

  .swagger-ui .opblock .opblock-summary-method {
    background: #000;
    color: #fff;
    background: none !important;
    text-align: right;
  }

  .swagger-ui .opblock .opblock-summary-method .h4 span::after {
    background: none;
    text-align: right;
  }

  .swagger-ui .opblock.opblock-post .opblock-summary-method,
  .swagger-ui .opblock.opblock-post h4 span::after {
    color: #48cb90;
  }

  .swagger-ui .opblock.opblock-post .opblock-summary-control {
    border-color: #48cb90;
  }

  .swagger-ui .opblock.opblock-put .opblock-summary-method,
  .swagger-ui .opblock.opblock-put h4 span::after {
    color: #d59d58;
  }

  .swagger-ui .opblock.opblock-put .opblock-summary-control {
    border-color: #d59d58;
  }

  .swagger-ui .opblock.opblock-delete .opblock-summary-method,
  .swagger-ui .opblock.opblock-delete h4 span::after {
    color: #c83232;
  }

  .swagger-ui .opblock.opblock-delete .opblock-summary-control {
    border-color: #c83232;
  }

  .swagger-ui .opblock.opblock-get .opblock-summary-method,
  .swagger-ui .opblock.opblock-get h4 span::after {
    color: #2a69a7;
  }

  .swagger-ui .opblock.opblock-get .opblock-summary-control {
    border-color: #2a69a7;
  }

  .swagger-ui .opblock.opblock-patch .opblock-summary-method,
  .swagger-ui .opblock.opblock-patch h4 span::after {
    color: #5cd6bc;
  }

  .swagger-ui .opblock.opblock-patch .opblock-summary-control {
    border-color: #5cd6bc;
  }

  .swagger-ui .opblock.opblock-head .opblock-summary-method,
  .swagger-ui
    .opblock.opblock-head
    .tab-header
    .tab-item.active
    h4
    span::after {
    color: #8c3fcf;
  }

  .swagger-ui .opblock.opblock-head .opblock-summary-control {
    border-color: #8c3fcf;
  }

  .swagger-ui .opblock.opblock-options .opblock-summary-method,
  .swagger-ui
    .opblock.opblock-options
    .tab-header
    .tab-item.active
    h4
    span::after {
    color: #24598f;
  }

  .swagger-ui .opblock.opblock-options .opblock-summary-control {
    border-color: #24598f;
  }

  .swagger-ui .opblock.opblock-deprecated .opblock-summary-method,
  .swagger-ui
    .opblock.opblock-deprecated
    .tab-header
    .tab-item.active
    h4
    span::after {
    color: #2e2e2e;
  }

  .swagger-ui .opblock.opblock-deprecated .opblock-summary-control {
    border-color: #2e2e2e;
  }

  .swagger-ui .filter .operation-filter-input {
    border: 2px solid #2b3446;
  }

  .swagger-ui .tab li:first-of-type::after {
    background: rgba(0, 0, 0, 0.2);
  }

  .swagger-ui .download-contents {
    background: #7c8192;
    color: #fff;
  }

  .swagger-ui .scheme-container {
    background: #1c1c21;
    box-shadow: rgba(0, 0, 0, 0.15) 0 1px 2px 0;
  }

  .swagger-ui .loading-container .loading::before {
    animation: 1s linear 0s infinite normal none running rotation,
      0.5s ease 0s 1 normal none running opacity;
    border-color: rgba(0, 0, 0, 0.6) rgba(84, 84, 84, 0.1) rgba(84, 84, 84, 0.1);
  }

  .swagger-ui .response-control-media-type--accept-controller select {
    border-color: #196619;
  }

  .swagger-ui .response-control-media-type__accept-message {
    color: #99e699;
  }

  .swagger-ui .version-pragma__message code {
    background-color: #3b3b3b;
  }

  .swagger-ui .btn {
    background: 0 0;
    border: 2px solid gray;
    box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px;
    color: #b5bac9;
  }

  .swagger-ui .btn:hover {
    box-shadow: rgba(0, 0, 0, 0.3) 0 0 5px;
  }

  .swagger-ui .btn.cancel:hover {
    background-color: #a72a2a;
    color: #fff;
  }

  .swagger-ui .btn.execute {
    background-color: #5892d5;
    border-color: #5892d5;
    color: #fff;
  }

  .swagger-ui .copy-to-clipboard {
    background: #7c8192;
  }

  .swagger-ui select {
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4wICg0MDM1YTRmYjQ5LCAyMDIwLTA1LTAxKSIKICAgc29kaXBvZGk6ZG9jbmFtZT0iZG93bmxvYWQuc3ZnIgogICBpZD0ic3ZnNCIKICAgdmVyc2lvbj0iMS4xIgogICB2aWV3Qm94PSIwIDAgMjAgMjAiPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTEwIj4KICAgIDxyZGY6UkRGPgogICAgICA8Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+CiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPgogICAgICA8L2NjOldvcms+CiAgICA8L3JkZjpSREY+CiAgPC9tZXRhZGF0YT4KICA8ZGVmcwogICAgIGlkPSJkZWZzOCIgLz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ic3ZnNCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOndpbmRvdy15PSItOSIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iLTkiCiAgICAgaW5rc2NhcGU6Y3k9IjEwIgogICAgIGlua3NjYXBlOmN4PSIxMCIKICAgICBpbmtzY2FwZTp6b29tPSI0MS41IgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpZD0ibmFtZWR2aWV3NiIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDAxIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTkyMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIgogICAgIGd1aWRldG9sZXJhbmNlPSIxMCIKICAgICBncmlkdG9sZXJhbmNlPSIxMCIKICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGJvcmRlcm9wYWNpdHk9IjEiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIiAvPgogIDxwYXRoCiAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZiIKICAgICBpZD0icGF0aDIiCiAgICAgZD0iTTEzLjQxOCA3Ljg1OWEuNjk1LjY5NSAwIDAxLjk3OCAwIC42OC42OCAwIDAxMCAuOTY5bC0zLjkwOCAzLjgzYS42OTcuNjk3IDAgMDEtLjk3OSAwbC0zLjkwOC0zLjgzYS42OC42OCAwIDAxMC0uOTY5LjY5NS42OTUgMCAwMS45NzggMEwxMCAxMWwzLjQxOC0zLjE0MXoiIC8+Cjwvc3ZnPgo=)
      right 10px center/20px no-repeat #1c1c21;
    border: 2px solid #41444e;
  }

  .swagger-ui select[multiple] {
    background: #212121;
  }

  .swagger-ui button.invalid,
  .swagger-ui input[type="email"].invalid,
  .swagger-ui input[type="file"].invalid,
  .swagger-ui input[type="password"].invalid,
  .swagger-ui input[type="search"].invalid,
  .swagger-ui input[type="text"].invalid,
  .swagger-ui select.invalid,
  .swagger-ui textarea.invalid {
    background: #390e0e;
    border-color: #c83232;
  }

  .swagger-ui input[type="email"],
  .swagger-ui input[type="file"],
  .swagger-ui input[type="password"],
  .swagger-ui input[type="search"],
  .swagger-ui input[type="text"],
  .swagger-ui textarea {
    background: #1c1c21;
    border: 1px solid #404040;
  }

  .swagger-ui textarea {
    background: rgba(28, 28, 33, 0.8);
    color: #b5bac9;
  }

  .swagger-ui input[disabled],
  .swagger-ui select[disabled] {
    background-color: #1f1f22;
    color: #bfbfbf;
  }

  .swagger-ui textarea[disabled] {
    background-color: #41444e;
    color: #fff;
  }

  .swagger-ui select[disabled] {
    border-color: #878787;
  }

  .swagger-ui textarea:focus {
    border: 2px solid #2a69a7;
  }

  .swagger-ui .checkbox input[type="checkbox"] + label > .item {
    background: #303030;
    box-shadow: #303030 0 0 0 2px;
  }

  .swagger-ui .checkbox input[type="checkbox"]:checked + label > .item {
    background: url('data:image/svg+xml;charset=utf-8,<svg width="10" height="8" viewBox="3 7 10 8" xmlns="http://www.w3.org/2000/svg"><path fill="%2341474E" fill-rule="evenodd" d="M6.333 15L3 11.667l1.333-1.334 2 2L11.667 7 13 8.333z"/></svg>')
      50% center no-repeat #303030;
  }

  .swagger-ui .dialog-ux .backdrop-ux {
    background: rgba(0, 0, 0, 0.8);
  }

  .swagger-ui .dialog-ux .modal-ux {
    background: #1c1c21;
    border: 1px solid #2e2e2e;
    box-shadow: rgba(0, 0, 0, 0.2) 0 10px 30px 0;
  }

  .swagger-ui .dialog-ux .modal-ux-header .close-modal {
    background: 0 0;
  }

  .swagger-ui .model-toggle::after {
    background: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>')
      50% center/100% no-repeat;
  }

  .swagger-ui .model-hint {
    background: rgba(0, 0, 0, 0.7);
    color: #ebebeb;
  }

  .swagger-ui section.models {
    border: 1px solid rgba(58, 64, 80, 0.3);
  }

  .swagger-ui section.models.is-open h4 {
    border-bottom: 1px solid rgba(58, 64, 80, 0.3);
  }

  .swagger-ui section.models .model-container {
    background: rgba(0, 0, 0, 0.05);
  }

  .swagger-ui section.models .model-container:hover {
    background: rgba(0, 0, 0, 0.07);
  }

  .swagger-ui .model-box {
    background: rgba(0, 0, 0, 0.1);
  }

  .swagger-ui .prop-type {
    color: #aaaad4;
  }

  .swagger-ui table thead tr td,
  .swagger-ui table thead tr th {
    border-bottom: 1px solid rgba(58, 64, 80, 0.2);
    color: #b5bac9;
  }

  .swagger-ui .parameter__name.required::after {
    color: rgba(230, 153, 153, 0.6);
  }

  .swagger-ui .topbar .download-url-wrapper .select-label {
    color: #f0f0f0;
  }

  .swagger-ui .topbar .download-url-wrapper .download-url-button {
    background: #63a040;
    color: #fff;
  }

  .swagger-ui .info .title small {
    background: #7c8492;
  }

  .swagger-ui .info .title small.version-stamp {
    background-color: #7a9b27;
  }

  .info {
    padding-top: 10px !important;
    padding-bottom: 10px !important;
    margin: 0 !important;
    padding-top: 14px !important;
    height: 62px !important;
    border-bottom: 2px solid #2e2e2e;
  }
  .info h2 {
    font-size: 24px !important;
    color: #fbfbfb !important;
  }

  .opblock-tag {
    font-size: 18px !important;
  }

  .swagger-ui .auth-container .errors {
    background-color: #350d0d;
    color: #b5bac9;
  }

  .swagger-ui .errors-wrapper {
    background: rgba(200, 50, 50, 0.1);
    border: 2px solid #c83232;
  }

  .wrapper {
    display: none !important;
    background-color: #242427 !important;
    width: 100% !important;
    max-width: 400px !important;
    margin-left: 0 !important;
    margin-right: auto !important;
    overflow-y: auto !important;
  }

  .wrapper:nth-of-type(1) {
    display: block !important;
  }

  .wrapper:nth-of-type(3) {
    display: block !important;
    max-height: calc(100lvh - 60px) !important;
  }

  .swagger-ui .markdown code,
  .swagger-ui .renderedmarkdown code {
    background: rgba(0, 0, 0, 0.05);
    color: #c299e6;
  }

  .swagger-ui .model-toggle:after {
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4wICg0MDM1YTRmYjQ5LCAyMDIwLTA1LTAxKSIKICAgc29kaXBvZGk6ZG9jbmFtZT0iZG93bmxvYWQyLnN2ZyIKICAgaWQ9InN2ZzQiCiAgIHZlcnNpb249IjEuMSIKICAgaGVpZ2h0PSIyNCIKICAgd2lkdGg9IjI0Ij4KICA8bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGExMCI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGRlZnMKICAgICBpZD0iZGVmczgiIC8+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzQiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iLTkiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii05IgogICAgIGlua3NjYXBlOmN5PSIxMiIKICAgICBpbmtzY2FwZTpjeD0iMTIiCiAgICAgaW5rc2NhcGU6em9vbT0iMzQuNTgzMzMzIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpZD0ibmFtZWR2aWV3NiIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDAxIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTkyMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIgogICAgIGd1aWRldG9sZXJhbmNlPSIxMCIKICAgICBncmlkdG9sZXJhbmNlPSIxMCIKICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGJvcmRlcm9wYWNpdHk9IjEiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIiAvPgogIDxwYXRoCiAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZiIKICAgICBpZD0icGF0aDIiCiAgICAgZD0iTTEwIDZMOC41OSA3LjQxIDEzLjE3IDEybC00LjU4IDQuNTlMMTAgMThsNi02eiIgLz4KPC9zdmc+Cg==)
      50% no-repeat;
  }

  /* arrows for each operation and request are now white */
  .arrow,
  #large-arrow-up {
    fill: #fff;
  }

  .arrow,
  #large-arrow-up {
    fill: #fff;
  }

  .swagger-ui .hover-white:focus,
  .swagger-ui .hover-white:hover,
  .swagger-ui .info .title small pre,
  .swagger-ui .topbar a,
  .swagger-ui .white {
    color: #fff!important;
  }

  .swagger-ui .bg-black-10,
  .swagger-ui .hover-bg-black-10:focus,
  .swagger-ui .hover-bg-black-10:hover,
  .swagger-ui .stripe-dark:nth-child(2n + 1) {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .swagger-ui .bg-white-10,
  .swagger-ui .hover-bg-white-10:focus,
  .swagger-ui .hover-bg-white-10:hover,
  .swagger-ui .stripe-light:nth-child(2n + 1) {
    background-color: rgba(28, 28, 33, 0.1);
  }

  .swagger-ui .bg-light-silver,
  .swagger-ui .hover-bg-light-silver:focus,
  .swagger-ui .hover-bg-light-silver:hover,
  .swagger-ui .striped--light-silver:nth-child(2n + 1) {
    background-color: #6e6e6e;
  }

  .swagger-ui .bg-moon-gray,
  .swagger-ui .hover-bg-moon-gray:focus,
  .swagger-ui .hover-bg-moon-gray:hover,
  .swagger-ui .striped--moon-gray:nth-child(2n + 1) {
    background-color: #4d4d4d;
  }

  .swagger-ui .bg-light-gray,
  .swagger-ui .hover-bg-light-gray:focus,
  .swagger-ui .hover-bg-light-gray:hover,
  .swagger-ui .striped--light-gray:nth-child(2n + 1) {
    background-color: #2b2b2b;
  }

  .swagger-ui .bg-near-white,
  .swagger-ui .hover-bg-near-white:focus,
  .swagger-ui .hover-bg-near-white:hover,
  .swagger-ui .striped--near-white:nth-child(2n + 1) {
    background-color: #242424;
  }

  .swagger-ui .opblock-tag:hover,
  .swagger-ui section.models h4:hover {
    background: rgba(0, 0, 0, 0.02);
  }

  .swagger-ui .checkbox p,
  .swagger-ui .dialog-ux .modal-ux-content h4,
  .swagger-ui .dialog-ux .modal-ux-content p,
  .swagger-ui .dialog-ux .modal-ux-header h3,
  .swagger-ui .errors-wrapper .errors h4,
  .swagger-ui .errors-wrapper hgroup h4,
  .swagger-ui .info .base-url,
  .swagger-ui .info .title,
  .swagger-ui .info h1,
  .swagger-ui .info h2,
  .swagger-ui .info h3,
  .swagger-ui .info h4,
  .swagger-ui .info h5,
  .swagger-ui .info li,
  .swagger-ui .info p,
  .swagger-ui .info table,
  .swagger-ui .loading-container .loading::after,
  .swagger-ui .model,
  .swagger-ui .opblock .opblock-section-header h4,
  .swagger-ui .opblock .opblock-section-header > label,
  .swagger-ui .opblock .opblock-summary-description,
  .swagger-ui .opblock .opblock-summary-operation-id,
  .swagger-ui .opblock .opblock-summary-path,
  .swagger-ui .opblock .opblock-summary-path__deprecated,
  .swagger-ui .opblock-description-wrapper,
  .swagger-ui .opblock-description-wrapper h4,
  .swagger-ui .opblock-description-wrapper p,
  .swagger-ui .opblock-external-docs-wrapper,
  .swagger-ui .opblock-external-docs-wrapper h4,
  .swagger-ui .opblock-external-docs-wrapper p,
  .swagger-ui .opblock-tag small,
  .swagger-ui .opblock-title_normal,
  .swagger-ui .opblock-title_normal h4,
  .swagger-ui .opblock-title_normal p,
  .swagger-ui .parameter__name,
  .swagger-ui .parameter__type,
  .swagger-ui .response-col_links,
  .swagger-ui .response-col_status,
  .swagger-ui .responses-inner h4,
  .swagger-ui .responses-inner h5,
  .swagger-ui .scheme-container .schemes > label,
  .swagger-ui .scopes h2,
  .swagger-ui .servers > label,
  .swagger-ui .tab li,
  .swagger-ui label,
  .swagger-ui select,
  .swagger-ui table.headers td {
    color: #b5bac9!important;
  }

  .swagger-ui .download-url-wrapper .failed,
  .swagger-ui .filter .failed,
  .swagger-ui .model-deprecated-warning,
  .swagger-ui .parameter__deprecated,
  .swagger-ui .parameter__name.required span,
  .swagger-ui table.model tr.property-row .star {
    color: #e69999;
  }

  .swagger-ui .opblock-summary-control {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    outline: none !important;
    color: #fbfbfb !important;
  }

  .swagger-ui .opblock {
    margin-bottom: 0 !important;
    background: none !important;
    border: none !important;
    outline: none !important;
  }

  .swagger-ui .opblock-control-arrow {
    display: none !important;
  }

  .swagger-ui .view-line-link {
    display: none !important;
  }

  .opblock .no-margin {
    position: fixed !important;
    overflow-y: scroll !important;
    top: 0 !important;
    height: 100vh !important;
    left: 400px !important;
    right: 0 !important;
    z-index: 1000 !important;
    width: auto !important;
  }

  svg.arrow {
    width: 12px !important;
    height: 12px !important;
  }

  .swagger-ui .expand-methods svg,
  .swagger-ui .expand-methods:hover svg {
    fill: #bfbfbf;
  }

  .swagger-ui .auth-container,
  .swagger-ui .dialog-ux .modal-ux-header {
    border-bottom: 1px solid #2e2e2e;
  }

  .swagger-ui .topbar .download-url-wrapper .select-label select,
  .swagger-ui .topbar .download-url-wrapper input[type="text"] {
    border: 2px solid #63a040;
  }

  .swagger-ui .topbar {
    background-color: #242427 !important;
    display: none !important;
  }

  /* Dark Scrollbar */
  ::-webkit-scrollbar {
    width: 14px;
    height: 14px;
  }

  ::-webkit-scrollbar-button {
    background-color: #3e4346 !important;
  }

  ::-webkit-scrollbar-track {
    background-color: #646464 !important;
  }

  ::-webkit-scrollbar-track-piece {
    background-color: #3e4346 !important;
  }

  ::-webkit-scrollbar-thumb {
    height: 50px;
    background-color: #242424 !important;
    border: 2px solid #3e4346 !important;
  }

  ::-webkit-scrollbar-button:vertical:start:decrement {
    background: linear-gradient(130deg, #696969 40%, rgba(255, 0, 0, 0) 41%),
      linear-gradient(230deg, #696969 40%, rgba(0, 0, 0, 0) 41%),
      linear-gradient(0deg, #696969 40%, rgba(0, 0, 0, 0) 31%);
    background-color: #b6b6b6;
  }

  ::-webkit-scrollbar-button:vertical:end:increment {
    background: linear-gradient(310deg, #696969 40%, rgba(0, 0, 0, 0) 41%),
      linear-gradient(50deg, #696969 40%, rgba(0, 0, 0, 0) 41%),
      linear-gradient(180deg, #696969 40%, rgba(0, 0, 0, 0) 31%);
    background-color: #b6b6b6;
  }

  ::-webkit-scrollbar-button:horizontal:end:increment {
    background: linear-gradient(210deg, #696969 40%, rgba(0, 0, 0, 0) 41%),
      linear-gradient(330deg, #696969 40%, rgba(0, 0, 0, 0) 41%),
      linear-gradient(90deg, #696969 30%, rgba(0, 0, 0, 0) 31%);
    background-color: #b6b6b6;
  }

  ::-webkit-scrollbar-button:horizontal:start:decrement {
    background: linear-gradient(30deg, #696969 40%, rgba(0, 0, 0, 0) 41%),
      linear-gradient(150deg, #696969 40%, rgba(0, 0, 0, 0) 41%),
      linear-gradient(270deg, #696969 30%, rgba(0, 0, 0, 0) 31%);
    background-color: #b6b6b6;
  }
}
`;

export const swaggerJs = `
window.addEventListener("load", () =>
  setTimeout(function () {
    const tags = document.querySelectorAll(".opblock-tag");
    
    tags.forEach((tag) => {
      tag.addEventListener("click", function () {
        setTimeout(function () {
          closeAllMethods();
        }, 150);
      });
    });

    function closeAllMethods() {
      const operationButtons = document.querySelectorAll(".opblock");

      operationButtons.forEach((button) => {
        button.addEventListener("click", function () {
          operationButtons.forEach((otherButton) => {
            if (otherButton !== button) {
              if (otherButton.querySelector(".no-margin")) {
                console.log("clicked");
                otherButton.querySelector(".opblock-summary-control").click();
              }
            }
          });
        });
      });
    }

    closeAllMethods();
  }, 200)
);

`;
