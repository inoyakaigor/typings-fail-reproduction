declare namespace IndexStylModule {
  export interface IIndexStyl {
    page: string;
  }
}

declare const IndexStylModule: IndexStylModule.IIndexStyl & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IndexStylModule.IIndexStyl;
};

export = IndexStylModule;
