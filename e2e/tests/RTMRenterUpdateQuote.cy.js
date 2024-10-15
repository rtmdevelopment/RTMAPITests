/// <reference types ="Cypress" />



describe("Update Quote", () => {

    beforeEach(function () {

        cy.fixture('RTMBody').then(function (RTMBody) {
            this.RTMBody = RTMBody
        })

    })


    it('tests Renter accept the quote', function () {
        const quote = this.RTMBody.updateQuote

        cy.updateQuote(quote)
            .then(response => {
                cy.log(response.body);
                cy.log(response.body.result.orderSave.order_status);
                expect(response.body.result.orderSave.order_status).eql('order_initiated');
                expect(response.status).eql(200);
                expect(response.body.result.bookingSave.quote_id).eql(quote.quoteid)

            })

    })


})