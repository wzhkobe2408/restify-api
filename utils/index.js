module.exports = {
  checkforReqType: (req, type) => {
    if (!req.is(type)) {
      return next(new errors.InvalidContentError(`Expects '${type}'`))
    }
  }
}
