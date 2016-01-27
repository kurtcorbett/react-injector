import createElement from '../createElement'
import { NonInjectableComponent, InjectableComponent, DeepInjectableComponent, DeepDependency, Dependency1 } from './create-element-specs-setup'
import React, { ReactElement } from 'react'

context('createElement', function() {
    describe('When creating an element that is NOT injectable', function() {
        let element

        before(function() {
            element = createElement(<NonInjectableComponent />)
        })

        it('should return a react component', () => React.isValidElement(element).should.be.true)
    })

    describe('When creating an element that IS injectable', function() {
        let element

        before(function() {
            element = createElement(<InjectableComponent />)
        })

        it('should return a react component', () => React.isValidElement(element).should.be.true)
        it('should have the injected props', () => element.props.Dependency1.should.be.instanceof(Dependency1))
        it('should be able to use the injected props', () => element.props.Dependency1.say().should.equal("cheese!"))
    })

    describe('When creating an element that IS deeply injectable', function() {
        let element

        before(function() {
            element = createElement(<DeepInjectableComponent />)
        })

        it('should return a react component', () => React.isValidElement(element).should.be.true)
        it('should have the injected props', () => element.props.DeepDependency.should.be.instanceof(DeepDependency))
        it('should be able to use the injected props', () => element.props.DeepDependency.say().should.equal("say cheese!"))
    })

    describe('When trying to create an element that is not a valid React component', function() {
        let exception

        before(function() {
            try {
                createElement("not a valid component")
            } catch(e) {
                exception = e
            }
        })

        it('should throw an exception', () => exception.should.not.be.null)
    })
})
