const checkCalcReq = require(`./checkCalcReq`);
const checkBodyForUserNameAndPass = require(`./check-user-and-pas`);
const authCheck = require(`./authCheck`);
const addFileToReq = require(`./addFileToReq`);
const isReqMulipartData = require('./isReqMulipartData');
const checkCreateNewEated = require(`./checkCreateNewEated`);

module.exports = {
	checkCalcReq,
	checkBodyForUserNameAndPass,
	authCheck,
	addFileToReq,
	isReqMulipartData,
	checkCreateNewEated,
};
